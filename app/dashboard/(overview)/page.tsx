import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
import { fetchCardData, fetchLatestInvoices } from "../../lib/data";
import CardWrapper, { Card } from "../../ui/dashboard/cards";
import { lusitana } from "../../ui/fonts";
import { Suspense } from "react";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";

export default async function Page() {
    // ウィーターフォールでデータ取得
    // const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices} = await fetchCardData();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-x1 md:text-2x1`}>
            Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collectd" value={totalPaidInvoices} type="collected" /> */}
                {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
                {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
                {/* <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
                <Suspense fallback={<CardSkeleton/>}>
                    <CardWrapper/>
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* 部分的なスケルトン表示 */}
                {/* <RevenueChart revenue={revenue}  /> */}
                <Suspense fallback={<RevenueChartSkeleton />} >
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton/>}>
                    <LatestInvoices latestInvoices={latestInvoices} />
                </Suspense>
            </div>
        </main>
    );
}
