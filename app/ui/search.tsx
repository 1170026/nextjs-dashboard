'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();// 現在のURLから検索パラメータを取得
  const pathname = usePathname(); // 現在のページのパスを取得
  const { replace } = useRouter();  // ルーターのreplaceメソッドを取得してURLを更新

  // inputから取得した文字列をもとにURLの検索パラメータを更新
  // function handleSearch(term: string) {
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching...${term}`)
    const params = new URLSearchParams(searchParams);// URLSearchParamsオブジェクトを生成


    if (term) { // 検索クエリが入力された場合、queryパラメータを設定
      params.set('query', term);
    } else { // 空の場合、queryパラメータを削除
      params.delete('query')
    }
    // 現在のパスと新しい検索パラメータでURLを置き換える
    replace(`${pathname}?${params.toString()}`);
    //${}:中に変数や式を入れ、その値が文字列に埋め込み
  }, 300 //入力更新を3秒停止
  )

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()} // URLと入力を同期させる
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
function useDeboundedCallback(arg0: (term: any) => void, arg1: number) {
  throw new Error('Function not implemented.');
}

