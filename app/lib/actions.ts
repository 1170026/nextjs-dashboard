// のファイル内にエクスポートされた関数はすべて「サーバー アクション」としてマーク
// サーバー アクションは、クライアント側（ブラウザ）から呼び出してサーバー側で実行される関数
'use server';

import { z } from "zod"; //スキーマからデータの検証を行うためのライブラリ
import { sql } from '@vercel/postgres';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(), //文字列から数値への変換
    status: z.enum(['pending', 'paid']), //'pending'または'paid'のいずれか
    date: z.string(),
})
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) { 
    // create-formのformタグで取得したkeyと値を取得
    // parseの役割：データが正しい形式かどうかを検証し、必要ならエラーを投げたり、データを期待される型に変換
    // zodライブラリを使ったデータの検証と解析
    const { customerId, amount, status } = CreateInvoice.parse({
        // formDataオブジェクトからデータを取得
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id,amount,status, status, date)
        VALUES (${customerId},${amountInCents},${status}, ${date})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.'
        }
    }

    // sqlテンプレートリテラルでデータベースに請求書情報を挿入するSQLクエリを実行
    // customerId、amountInCents、status、dateが対応するフィールドに挿入
    revalidatePath('/dashboard/invoices');//ページキャッシュのクリア
    redirect('/dashboard/invoices');//検索後にリダイレクト
}

export async function UpdateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })
    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;

    } catch (error) {
        return {
            message: 'Database Error: Failed to Updata Invoice.'
        }
    }
    
    revalidatePath('/dashboard/invoices');//ページキャッシュのクリア
    redirect('/dashboard/invoices');//検索後にリダイレクト
}
export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice');//開発用エラー出力
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice' };
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice.'
        }
    }
}