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

  console.log('[[DATA TO SAVE]] ::: ', dataToSave);

  try {
    if (resume instanceof File) {
      console.log('[[RESUME]] ::: ', resume, typeof resume);
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
