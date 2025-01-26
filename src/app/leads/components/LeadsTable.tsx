'use client';
import { Stack, Table, Button, Flex } from '@chakra-ui/react';
import { useAssessmentRepository } from '@lib/domains/assessment/useAssessmentRepository';
import { useLeads } from '@lib/domains/assessment/useLeads';
import { useUpdateLead } from '@lib/domains/assessment/useUpdateLead';
import { EStatus } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const LeadsTable = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const search = params.get('search');
  const status = params.get('status');
  const pageNumber = params.get('page');
  const pageNumberInt = pageNumber ? parseInt(pageNumber, 10) : 1;

  const repository = useAssessmentRepository();
  const { data, isLoading, refetch } = useLeads({ repository, params: { search, status, page: pageNumberInt } });

  const onUpdateSuccess = () => {
    void refetch();
  };
  const { changeLeadStatus } = useUpdateLead({ repository, onSuccess: onUpdateSuccess });

  const pathname = usePathname();
  const { replace } = useRouter();

  const onChangePage = (e: { page: number }) => {
    if (!e.page || e.page === 1) {
      params.delete('page');
    } else {
      params.set('page', e.page.toString());
    }
    void replace(`${pathname}?${params.toString()}`);
  };

  return isLoading ? (
    <>Loading...</>
  ) : (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Submitted</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Country</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Update</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.results?.map(item => {
            const handleMarkAsReachedOut = () => {
              changeLeadStatus({ id: item.id, status: EStatus.REACHED_OUT });
            };
            return (
              <Table.Row key={item.id}>
                <Table.Cell>
                  {item.firstName} {item.lastName}
                </Table.Cell>
                <Table.Cell>{item.created}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>{item.countryOfCitizenship}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Button disabled={item.status === EStatus.REACHED_OUT} onClick={handleMarkAsReachedOut}>
                    Mark as reached out.
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Flex gap={1}>
        {data?.pagination.totalPages
          ? Array.from({ length: data?.pagination.totalPages }).map((_, i: number) => {
              return (
                <Button
                  variant={pageNumberInt === i + 1 ? 'solid' : 'outline'}
                  key={i}
                  onClick={() => onChangePage({ page: i + 1 })}
                >
                  {i + 1}
                </Button>
              );
            })
          : null}
      </Flex>
    </Stack>
  );
};
