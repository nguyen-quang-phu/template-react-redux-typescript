---
description: React-query 3.
---

# React-query với Typescript

### React-query để làm gì?

* Khi get hoặc post dữ liệu từ server thì sẽ có những trạng thái liên quan đến server như loading, success, error. Dựa vào trạng thái này mà ta phải hiện thị cho người dùng biết. 
* Để quản lý mấy cái này thì khá là phiền, ví dụ nếu xài redux thì phải lưu một trạng thái để xác định, xong phải xài thêm redux-thunk để xác định vì redux nó không cho bất đồng bộ.
* Redux tool kit thì có vẻ tiện hơn nó có sẵn createAsyncThunk nhưng vẫn phải viết extra reducer, mỗi lần vậy lại phải build add case 3 lần [😫](https://www.emojimeaning.com/vi/tired-face). Xong đã vậy nó còn cho ra thêm RTK query khác gì nó kêu createAsyncThunk về quê chăn trâu. 
* Chưa kể gặp mấy thằng user rảnh rỗi nó ngồi gửi request cả chục lần mà cái nào cũng giống nhau, vậy là phải ngồi check coi request đó get chưa, get rồi thì cache lại để tụi nó rảnh thì ngồi click mà mình không phải nhận đống request của tụi nó trên server.
* Tóm lại, xài react query viết cho ít, cho khỏe. Còn RTK query nó ra sao thì thật ra chưa xài, hôm nào rảnh thì chắc ngồi xài.

### Tóm tắt cách xài:

* Dùng get thì dùng query, cái khác thì dùng mutation.
* Đã xài typescript rồi thì chịu khó viết custom hook đi, để nó autocomplete mấy cái request, respone cho sướng \(mặc dù viết nó khổ vl ra 😭, tại thời điểm này \(23/8/2021\) phải nói là má search nát cái google với stackoverflow không một thằng nào xài typecript mà nó viết kiểu này luôn xong vừa ngồi đọc file type của nó vừa chửi, đúng là tự bản thân làm khó mình, thôi viết 1 lần mấy lần sau copy vậy \)
* Tóm tắt vậy thôi thích thì tự lên [https://react-query.tanstack.com/overview](https://react-query.tanstack.com/overview) mà đọc.

### Template Query:

* Viết 1 hàm get cái gì đó ở service, ví dụ getProduct đi:

```text
// services/types.ts

// cái này là kiểu của query của axios.get, chẳng hiểu sao nó ghi là params
// mà ở server phải lấy query nó mới chịu
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

// cái này là cái kiểu res.data là kiểu gì, bình thường thì cho nó trả 
// về message với status, trong res có status rồi thì body có status làm gì
// thằng axios hình như cái nào nó khác 200 là nó quăng ra lỗi khó chịu vl
// nên thôi cái nào ko phải lỗi server trả ra 200 hết sau đó đọc trong data
// mà xử lý tiếp
export type IGetProductResponse = AxiosResponse<{ message: string; status?: string; productList: ProductItem[] }>;

// cái này của query key, cái này dùng để định danh request để cache
export type IQueryKey = [string, number, number];

```

```text
// services/product.ts

// cái này thì viết theo sách giáo khoa rồi nên chắc cũng tự hiểu rồi
// không hiểu thì coi lại 500 bài code thiếu nhi hen
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

// nhìn cái file nó có mấy dòng vậy thôi ngồi viết cũng 2 tiếng
// không biết mình ngu hay cái thằng viết nó sao nữa
// tham số thứ ba nó gán bằng thắng thứ nhất rồi thì bắt mình truyền vào chi không biết

// cái query key mà không định nghĩa kiểu thì thôi tới mùa quýt nó mới chạy nha
// mà thể rõ ràng nhìn là thằng useQuery nó nhận 3 tham số xong lúc xài lại chỉ
// có queryKey, với config nó vi diệu thật chứ 
// config là cái object viết mấy cái onSuccess, onError á.
// thằng context thì thôi trong file type là éo có nó luôn xong phải ngồi đọc từng
// dòng doc kia mới biết có nó tồn tại.

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
    onSuccess: ({ data }) => {
      setlistProduct(data.productList);// res.data thích làm gì thì làm
    },
    enabled: false, // để khỏi auto load
  });
  useEffect(() => {
    refetch(); // nào muốn get data thì gọi nó
  }, []);
```

