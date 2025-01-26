import { FormatedData, GoogleImagesUploadUseCase } from '@api/v1/assessment/GoogleImageUpload';
import { prisma } from '@lib/prisma';
import { ECountry, EStatus, EVisa } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const firstName = body.get('firstName') as string;
  const lastName = body.get('lastName') as string;
  const email = body.get('email') as string;
  const linkedin = body.get('linkedinUrl') as string;
  const countryOfCitizenship = body.get('countryOfCitizenship') as ECountry;
  const description = body.get('description') as string;
  const visaInterest = body.getAll('visaInterest[visaType]') as EVisa[];
  const resume = body.get('resume');

  let dataToSave: FormatedData = {
    firstName,
    lastName,
    email,
    countryOfCitizenship,
    linkedin,
    description,
    visaInterest,
    status: EStatus.PENDING,
    resumeUrl: '',
  };

  try {
    if (resume instanceof File) {
      dataToSave = await GoogleImagesUploadUseCase(dataToSave, resume);
    }

    const savedData = await prisma.leads.create({
      data: dataToSave,
    });

    return NextResponse.json({
      status: 201,
      data: savedData,
    });
  } catch (error) {
    console.log('[[ERROR]] ::: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') as EStatus | undefined;

    const sort = searchParams.get('sort') || undefined;
    let orderBy: Record<string, 'asc' | 'desc'> | undefined;

    if (sort) {
      const isDescending = sort.startsWith('-');
      const column = isDescending ? sort.slice(1) : sort; // Remove "-" for descending sort
      orderBy = {
        [column]: isDescending ? 'desc' : 'asc',
      };
    }

    const whereClause: Record<string, unknown> = {};
    if (search) {
      whereClause.OR = [
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    const leads = await prisma.leads.findMany({
      skip,
      take: pageSize,
      where: whereClause,
      orderBy,
    });

    const totalLeads = await prisma.leads.count({ where: whereClause });
    const totalPages = Math.ceil(totalLeads / pageSize);

    return NextResponse.json({
      status: 200,
      results: leads,
      pagination: {
        total: totalLeads,
        page,
        pageSize,
        totalPages,
      },
    });
  } catch (error) {
    console.error('[[ERROR]] ::: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  try {
    const updatedLead = await prisma.leads.update({
      where: {
        id: body.id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      status: 200,
      data: updatedLead,
    });
  } catch (error) {
    console.error('[[ERROR]] ::: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
