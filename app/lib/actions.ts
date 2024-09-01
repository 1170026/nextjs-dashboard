// のファイル内にエクスポートされた関数はすべて「サーバー アクション」としてマーク
// サーバー アクションは、クライアント側（ブラウザ）から呼び出してサーバー側で実行される関数
'use server';

import { z } from "zod"; //スキーマからデータの検証を行うためのライブラリ

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(), //文字列から数値への変換
    status: z.enum(['pending', 'paid']), //'pending'または'paid'のいずれか
    date: z.string(),
})
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
}