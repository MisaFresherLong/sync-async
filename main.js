function callAPI() {
  fetch("https://amis.manhnv.net/api/v1/Departments")
    .then((res) => res.json())
    .then((data) => {
      console.log("CallAPI data: ", data);
      return data;
    });
}

/**
 *
 * Đồng bộ vs bất đồng bộ
 *
 */

// // Code đồng bộ
// // Output:
// // 1
// // 2
// // 3
// function synchronous() {
//   console.log(1);
//   console.log(2);
//   console.log(3);
// }
// synchronous();

// // Code bất đồng bộ
// // Output:
// // 2
// // 3
// // 1
// // Câu hỏi: nếu setTimeout = 0ms thì sao?
// function asynchronous() {
//   setTimeout(() => {
//     console.log(1);
//   }, 2000);
//   console.log(2);
//   console.log(3);
// }
// asynchronous();

// // Code bất đồng bộ với api
// // Output:
// // 2
// // 3
// // CallAPI data:  (4) [{…}, {…}, {…}, {…}]
// function asynchronous() {
//   callAPI();
//   console.log(2);
//   console.log(3);
// }
// asynchronous();

/**
 *
 * Callback
 * Là HÀM được truyền vào dưới dạng tham số
 * Function cũng là object: In JavaScript, functions are first-class objects
 */

// Callback vẫn thường được dùng trong listen event
function sayHello() {
  alert("Hello guy!");
}

document.getElementById("say-hello").addEventListener("click", sayHello);

// // Callback vẫn thường được dùng trong vòng lặp vd forEach
// [1, 2, 3].forEach((number) => {
//   console.log(number);
// });

/**
 *
 * Ví dụ rõ ràng hơn về callback: là hàm được truyền dưới dạng tham số
 *
 */

// Hàm hiển thị hình ảnh
function renderImage(imageUrl, elementId) {
  document.getElementById(elementId).setAttribute("src", imageUrl);
}

// Hàm lấy url ảnh
function fetchImageUrl(callback, elementId = "img-1") {
  fetch("https://picsum.photos/200/300").then((res) => {
    const imageUrl = res.url;
    // console.log(imageUrl, elementId);

    callback(imageUrl, elementId);
  });
}

// // Hàm renderImage được truyền như là tham số vào hàm fetchImageUrl
// fetchImageUrl(renderImage);

/**
 *
 * Callback hell
 *
 */

// Bài toán hiển thị 3 ảnh lần lượt theo thứ tự img-1, img-2, img-3
// Sau khi img-1 render thành công thì mới được gọi api lấy imageUrl cho img-2

// // Phương án 1: cả 3 api đều được gọi cùng lúc, không thỏa mã điều kiện 2
// fetchImageUrl(renderImage, "img-1");
// fetchImageUrl(renderImage, "img-2");
// fetchImageUrl((imageUrl, elementId) => {
//   renderImage(imageUrl, elementId);
// }, "img-3");

// // Phương án 2: sau khi img-1 render thì mới gọi api lấy imageUrl cho img-2
// // Nhận xét: nếu hiển thị 10 img thì sẽ rất khó nhìn
// fetchImageUrl((imageUrl, elementId) => {
//   renderImage(imageUrl, elementId);

//   fetchImageUrl((imageUrl, elementId) => {
//     renderImage(imageUrl, elementId);

//     fetchImageUrl((imageUrl, elementId) => {
//       renderImage(imageUrl, elementId);
//     }, "img-3");
//   }, "img-2");
// }, "img-1");

/**
 *
 * Promise: lời hứa
 * Là một đối tượng javascrip, giúp lập trình bất đồng bộ
 *
 * Nhận xét: 1 lời hứa có thể có 2 kết quả, 1 là giữ hứa, 2 là thất hứa
 * 1 promise cũng có 2 kết quả, resolve - hoàn thành, reject - thất bại
 */

// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve("Giữ hứa"), 1000);
//   // setTimeout(() => reject("Thất hứa"), 1000);
// });

// // .then() hàm xử lý khi resolve, tham số data khi chạy resolve(data) sẽ được truyền vào callback của .then()
// // .catch() hàm xử lý khi reject, tham số cũng được truyền tương tự khi resolve
// myPromise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log(error));

// // Quay lại bài toán hiển thị 3 hình ảnh lần lượt
// function getPromise() {
//   return new Promise((resolve, reject) => {
//     fetchImageUrl(resolve);
//   });
// }

// getPromise()
//   .then((imageUrl) => {
//     renderImage(imageUrl, "img-1");
//     return getPromise();
//   })
//   .then((imageUrl) => {
//     renderImage(imageUrl, "img-2");
//     return getPromise();
//   })
//   .then((imageUrl) => {
//     renderImage(imageUrl, "img-3");
//   });

/**
 *
 * Async/await:
 * Giúp lập trình bất đồng bộ nhìn như là đồng bộ
 * Hàm async trả về một promise
 */

// // Từ khóa async đứng trước phần khai báo hàm
// // Từ khóa await đứng trước promise
// // await CHỈ có tác dụng trong hàm async
// async function simpleAsync() {
//   const res = await fetch("https://amis.manhnv.net/api/v1/Departments");
//   const data = await res.json();
//   console.log(data);
// }

// simpleAsync();

// // Quay lại bài toán hiển thị 3 hình ảnh lần lượt
// async function myAsync() {
//   // Hiển thị ảnh 1
//   const res1 = await fetch("https://picsum.photos/200/300");
//   const imageUrl1 = res1.url;
//   renderImage(imageUrl1, "img-1");

//   // Hiển thị ảnh 2
//   const res2 = await fetch("https://picsum.photos/200/300");
//   const imageUrl2 = res2.url;
//   renderImage(imageUrl2, "img-2");

//   // Hiển thị ảnh 3
//   const res3 = await fetch("https://picsum.photos/200/300");
//   const imageUrl3 = res3.url;
//   renderImage(imageUrl3, "img-3");
// }

// myAsync();
