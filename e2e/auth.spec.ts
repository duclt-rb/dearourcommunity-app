import { expect, test } from '@playwright/test';

// =======================================================
// CẤU HÌNH THÔNG TIN ĐĂNG NHẬP VÀ THÔNG TIN CẦN TÌM KIẾM
// =======================================================
const WP_USERNAME = 'tuyen@dearourcommunity.com';
const WP_PASSWORD = 'k6b+yJQ/I';
const SEARCH_EMAIL = 'agenticxxx.dev@gmail.com';

test.describe('WordPress Login Flow', () => {
  test('should fill username and password, then submit login form', async ({ page }) => {
    // 1. Đi vào trang login WordPress
    await page.goto('https://wordpress.dearourcommunity.asia/wp-login.php');

    // 2. Tìm input id="user_login" và điền username từ hằng số
    const usernameInput = page.locator('#user_login');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(WP_USERNAME);

    // 3. Tìm input id="user_pass" và điền password từ hằng số
    const passwordInput = page.locator('#user_pass');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(WP_PASSWORD);

    // 4. Click submit (nút Đăng nhập có id="wp-submit" và nằm trong form login #loginform)
    const submitButton = page.locator('#loginform #wp-submit, #wp-submit');
    await expect(submitButton).toBeVisible();

    // Thực hiện click và chờ URL chuyển sang trang dashboard quản trị (/wp-admin/)
    await Promise.all([
      page.waitForURL('**/wp-admin/**'), // Chờ URL chứa /wp-admin/ sau khi đăng nhập thành công
      submitButton.click(),
    ]);

    // 5. Xác nhận đã vào trang quản trị thành công
    await expect(page).toHaveURL(/.*wp-admin.*/);

    // 6. Điều hướng tiếp tới trang quản lý người dùng (users.php)
    await page.goto('https://wordpress.dearourcommunity.asia/wp-admin/users.php');

    // 7. Xác nhận đã vào đúng trang users.php
    await expect(page).toHaveURL(/.*users\.php.*/);

    // 8. Tìm input id="user-search-input" và điền email cần tìm kiếm từ hằng số
    const searchInput = page.locator('#user-search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(SEARCH_EMAIL);

    // 9. Click nút search-submit để bắt đầu tìm kiếm người dùng
    const searchSubmit = page.locator('#search-submit');
    await expect(searchSubmit).toBeVisible();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}), // Đợi tải trang kết quả tìm kiếm
      searchSubmit.click(),
    ]);

    // 10. Tìm thẻ td có attribute data-colname="Email" và kiểm tra xem có hiển thị đúng email tìm kiếm không
    const emailCell = page.locator('td[data-colname="Email"]').first();
    await expect(emailCell).toContainText(SEARCH_EMAIL);

    // 11. Tìm thẻ td có data-colname="Tên người dùng" (hoặc Username) và hover để hiển thị các nút chức năng ẩn
    const usernameCell = page
      .locator('td[data-colname="Tên người dùng"], td[data-colname="Username"]')
      .first();
    await expect(usernameCell).toBeVisible();
    await usernameCell.hover(); // Hover chuột để làm hiện link "Xóa" (submitdelete)

    // 12. Tìm thẻ a có class="submitdelete" và click để đi đến trang xác nhận xóa
    const deleteLink = usernameCell.locator('a.submitdelete');
    await expect(deleteLink).toBeVisible();
    await Promise.all([
      page.waitForURL(/.*users\.php\?action=delete.*/), // Đợi chuyển hướng sang trang xác nhận xóa
      deleteLink.click(),
    ]);

    // 13. Xác nhận trên trang xóa: Click vào input id="submit" để thực hiện xóa vĩnh viễn
    const confirmDeleteBtn = page.locator('input#submit, #submit');
    await expect(confirmDeleteBtn).toBeVisible();
    await Promise.all([
      page.waitForURL(/.*users\.php.*/), // Chờ chuyển hướng quay trở lại danh sách người dùng
      confirmDeleteBtn.click(),
    ]);

    // Chờ thêm 3 giây để bạn có thể theo dõi kết quả hiển thị trên màn hình
    await page.waitForTimeout(3000);
  });
});
