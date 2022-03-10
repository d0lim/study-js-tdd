/**
 * Promise를 쓰는 경우.
 * 코드에서 Promise를 반환하면 Jest가 해당 Promise가 완료되기를 기다린다.
 * 으잉? 앞에 콜백은 그냥 휙 가버리던데 이건 왜 되는걸까?
 * 아마 전체 Test Context로 Promise를 반환해주기 때문인 것 같다.
 * 내가 직접 구현한다고 치면, 이걸 특정 queue에 넣고,
 * 해당 queue가 다 빌 때까지 기다리면 될 것이다.
 * 만약 Promise가 Reject 되면, 테스트는 자동으로 실패한다.
 */
export function fetchDataPromise(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("peanut butter"), 100);
  });
}

test("the data is peanut butter", () => {
  // 반드시 이렇게 Promise를 반환해주어야 한다. 안그러면 그냥 끝까지 코드가 실행되고 꺼진다.
  return fetchDataPromise().then((data) => {
    expect(data).toBe("peanut butter");
  });
});

/**
 * 만약 promise가 reject 되어야 하면, .catch 메소드를 쓰면 된다.
 * 이 때, expect.assertions를 통해서 assertion이 몇 번 호출되는지를 명시해주어야 한다.
 * 안그러면 수행된 프로미스는 테스트에서 실패했다고 나오지 않을 것이다.
 */
export function fetchDataPromiseReject(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("error"), 100);
  });
}

test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchDataPromiseReject().catch((e) => expect(e).toMatch("error"));
});

/**
 * 그리고 matcher에 .resolves 와 .rejects 가 있는데 이걸 쓸 수도 있다.
 * resolves를 쓰면, 프로미스가 resolve 될 때까지 기다린다.
 * 그리고 reject되면 자동으로 테스트가 실패한다.
 * 반대의 경우(rejects)도 같다.
 * 이 경우에도 꼭 프로미스를 반환해주어야함을 잊지 말자.
 * 반환을 해주지 않으면 그냥 끝난줄 알고 테스트가 끝나버린다.
 */
test("the data is peanut butter and this test uses .resolves", () => {
  return expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the feetch fails with an error and this test uses .rejects", () => {
  return expect(fetchDataPromiseReject()).rejects.toMatch("error");
});
