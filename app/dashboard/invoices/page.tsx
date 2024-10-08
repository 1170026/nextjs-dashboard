import Table from '@/app/ui/invoices/table';
import { lusitana } from '@/app/ui/fonts';//fontのimportは自分で書く
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Suspense } from 'react';
import Pagination from '@/app/ui/invoices/pagination';

export default async function Page({
    searchParams,// 引数
    }: {
        searchParams?: { //型定義
            query?: string;
            page?: string;
    }
})
{
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);
    return (
        <>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className}`}>Invoices</h1>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="invoices.." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={ totalPages} />
            </div>
        </>
    );
}
