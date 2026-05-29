import { getRouterSelectors } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';
import { safeParseExtraData } from './router.helper';

// 1. Trích xuất các selectors mặc định từ @ngrx/router-store
export const {
  selectCurrentRoute, // Chọn route hiện tại
  selectFragment, // Chọn fragment hiện tại (ví dụ: #section)
  selectQueryParams, // Chọn toàn bộ query params
  selectQueryParam, // Hàm chọn query param cụ thể (ví dụ: selectQueryParam('orderId'))
  selectRouteParams, // Chọn toàn bộ route params
  selectRouteParam, // Hàm chọn route param cụ thể (ví dụ: selectRouteParam('id'))
  selectRouteData, // Chọn dữ liệu route data
  selectUrl, // Chọn URL hiện tại
} = getRouterSelectors();

// 2. Định nghĩa các selector cụ thể theo yêu cầu của bạn
// Chọn route param 'id' (ví dụ: /courses/:id)
export const selectId = selectRouteParam('id');

// Chọn route param 'orderId'
export const selectOrderId = selectRouteParam('orderId');

// Chọn query param 'orderId' (ví dụ: /receipt?orderId=123)
export const selectQueryOrderId = selectQueryParam('orderId');

// Chọn query param 'resultCode' (ví dụ: /receipt?resultCode=0)
export const selectQueryResultCode = selectQueryParam('resultCode');

// Chọn query param 'transId' (ví dụ: /receipt?transId=1283746529)
export const selectQueryTransId = selectQueryParam('transId');

// Chọn query param 'amount' (ví dụ: /receipt?amount=500000)
export const selectQueryAmount = selectQueryParam('amount');

// Chọn query param 'extraData' (ví dụ: /receipt?extraData=...)
export const selectQueryExtraData = selectQueryParam('extraData');

// Selector giải mã và phân tích cú pháp extraData từ query param
export const selectDecodedExtraData = createSelector(
  selectQueryExtraData,
  (extraDataVal): { packageId?: string; userId?: string } | null => {
    return typeof extraDataVal === 'string' ? safeParseExtraData(extraDataVal) : null;
  },
);
