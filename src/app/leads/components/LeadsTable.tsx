'use client';
import { Button, Flex, Link, Stack, Table, Text } from '@chakra-ui/react';
import { useAssessmentRepository } from '@lib/domains/assessment/useAssessmentRepository';
import { useLeads } from '@lib/domains/assessment/useLeads';
import { useUpdateLead } from '@lib/domains/assessment/useUpdateLead';
import { Countries } from '@lib/utils/countries.constant';
import { DefaultDateFormats, formatDateInLocalDate } from '@lib/utils/dates';
import { EStatus } from '@prisma/client';
import { Switch } from '@ui/base/chakra/switch';
import { Drawer } from '@ui/components/Drawer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HiCheck } from 'react-icons/hi';

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
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Submitted</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Country</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Details</Table.ColumnHeader>
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
                <Table.Cell>{formatDateInLocalDate(item.created, DefaultDateFormats.USTime)}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    {item.status}
                    <Switch
                      size="sm"
                      colorPalette="green"
                      disabled={item.status === EStatus.REACHED_OUT}
                      checked={item.status === EStatus.REACHED_OUT}
                      thumbLabel={{ on: <HiCheck /> }}
                      onCheckedChange={handleMarkAsReachedOut}
                    />
                  </Flex>
                </Table.Cell>
                <Table.Cell>{Countries[item.countryOfCitizenship]}</Table.Cell>
                <Table.Cell textAlign="end">
                  <Drawer
                    title={`${item.firstName} ${item.lastName} - ${item.status}`}
                    size="lg"
                    trigger={<Button size="xs">View details</Button>}
                  >
                    <Flex direction="column" gap={2} p={4}>
                      <Text>
                        <Text as="span" fontWeight="bold">
                          Name:{' '}
                        </Text>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text>
                        <Text as="span" fontWeight="bold">
                          Email:{' '}
                        </Text>
                        {item.email}
                      </Text>
                      <Text>
                        <Text as="span" fontWeight="bold">
                          LinkedIn:{' '}
                        </Text>
                        {item.linkedinUrl || '--'}
                      </Text>
                      <Text>
                        <Text as="span" fontWeight="bold">
                          Resume:{' '}
                        </Text>
                        {item.resumeUrl ? (
                          <Link variant="underline" colorPalette="blue" href={item.resumeUrl}>
                            {item.firstName} resume
                          </Link>
                        ) : (
                          '--'
                        )}
                      </Text>
                      <Text>
                        <Text as="span" fontWeight="bold">
                          Country of citizenship:{' '}
                        </Text>
                        {Countries[item.countryOfCitizenship]}
                      </Text>
                      <Text>
                        <Text fontWeight="bold">Description: </Text>
                        {item.description}
                      </Text>
                    </Flex>
                  </Drawer>
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
