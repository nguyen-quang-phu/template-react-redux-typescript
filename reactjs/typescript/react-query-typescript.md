---
description: React-query 3.
---

# React-query với Typescript

### React-query để làm gì?

* Khi get hoặc post dữ liệu từ server thì sẽ có những trạng thái liên quan đến server như loading, success, error. Dựa vào trạng thái này mà ta phải hiển thị spinner, data, hay thông báo lỗi . 
* Để quản lý mấy cái này thì khá là rắc rối, ví dụ nếu xài redux thì phải lưu một trạng thái để xác định, xong phải xài thêm redux-thunk để xác định vì redux nó không cho bất đồng bộ.
* Redux tool kit thì có vẻ tiện hơn nó có sẵn createAsyncThunk nhưng vẫn phải viết extra reducer, mỗi lần vậy lại phải build add case 3 lần [😫](https://www.emojimeaning.com/vi/tired-face). Xong đã vậy nó còn cho ra thêm RTK query để khỏi viết createAsycThunk.
* Xong mỗi lần gửi request giống nhau thì lại tốn tài nguyên server nên lại phải cache lại.
* Tóm lại, xài react query viết cho ít, cho khỏe. Còn RTK query nó ra sao thì thật ra chưa xài, hôm nào rảnh thì chắc ngồi xài.

### Tóm tắt cách xài:

* Dùng get thì dùng query, cái còn lại thì dùng mutation.
* Đã xài typescript rồi thì chịu khó viết custom hook, để nó autocomplete mấy cái request, respone cho khỏe.
* Document [https://react-query.tanstack.com/overview](https://react-query.tanstack.com/overview)

### Template Query:

* Viết 1 hàm get cái gì đó ở service, ví dụ getProduct đi:

```text
// services/types.ts

// cái này là kiểu của query của axios.get,
export type IGetProductRequestParams = {
  page: number;
  limit: number;
};

// kiểu của một product item
export interface ProductItem {
  id: number;
  title: string;
  price: string;
  image1: string;
  image2: string;
}

// kiểu của respone trả về
export type IGetProductResponse = AxiosResponse<{ message: string; status?: string; productList: ProductItem[] }>;

// type của query key dùng cho việc cache
export type IQueryKey = [string, number, number];

```

```text
// services/product.ts

import axios from '@Service/axios';

import {
  IGetProductRequestParams,
  IGetProductResponse,
  IPostProductRequestParams,
  IPostProductResponse,
} from './types';

export const getProduct = (params: IGetProductRequestParams = { page: 1, limit: 12 }): Promise<IGetProductResponse> =>
  axios.get('/shop/product', { params });


```

```text
// useGetProductQuery.ts

import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { getProduct, IGetProductResponse, IQueryKey } from '@Service/product';

const useGetProductQuery = (
  queryKey: IQueryKey,
  config?: UseQueryOptions<IGetProductResponse, AxiosError, IGetProductResponse, IQueryKey>,
): UseQueryResult<IGetProductResponse, AxiosError<unknown>> => {
  const query = useQuery<IGetProductResponse, AxiosError, IGetProductResponse, IQueryKey>(
    queryKey,
    (context) => getProduct({ page: context.queryKey[1], limit: context.queryKey[2] }),
    config,
  );

  return query;
};

export default useGetProductQuery;

```

```text
// 1 file nào đó get product

  const { isLoading, refetch } = useGetProductQuery(['getProduct', 1, 12], {
    onSuccess: ( res ) => {
      setlistProduct(data.productList);// 
    },
    enabled: false, // để khỏi auto load
  });
  useEffect(() => {
    refetch(); // nào muốn get data thì gọi nó
  }, []);
```

