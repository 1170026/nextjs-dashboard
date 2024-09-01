// のファイル内にエクスポートされた関数はすべて「サーバー アクション」としてマーク
// サーバー アクションは、クライアント側（ブラウザ）から呼び出してサーバー側で実行される関数
'use server';

export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    }
    console.log(rawFormData);
}