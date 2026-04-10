import { redirect } from 'next/navigation';

export default async function APIDocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/about`);
}
