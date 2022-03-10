import { fetchDataPromise, fetchDataPromiseReject } from "./promises.test";

/**
 * Promise 대신 async, await를 사용할 수도 있다. (당연히?)
 * 여타 promise 대신 async를 사용하는 코드처럼 작성해보자.
 */
test("the data is peanut butter and this test uses async/await", async () => {
  const data = await fetchDataPromise();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error and this test uses async/await", async () => {
  expect.assertions(1);
  try {
    await fetchDataPromiseReject();
  } catch (error) {
    expect(error).toMatch("error");
  }
});

/**
 * 개인적으로, 저 expect.assertions()가 조금 거슬린다.
 * 그리고 try - catch 도 없애고 싶다.
 * 그런데, 앞에서 resolves나 rejects matcher를 사용하면 이게 필요가 없었다.
 * try - catch도 마찬가지. async/await를 써도
 * resolves, rejects matcher와 함께 사용할 수 있다.
 */
test("the data is peanut butter and this test uses async/await, resolves", async () => {
  await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error and this uses async/await ,rejects", async () => {
  await expect(fetchDataPromiseReject()).rejects.toMatch("error");
});
