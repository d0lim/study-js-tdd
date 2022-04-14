/**
 * 예를 들어, forEach라는 함수를 구현하고, 테스팅한다고 해보자.
 * 함수의 모양은 아래와 같다.
 * 파라미터론 배열과 콜백을 받는다.
 */
function forEach(items: Array<any>, callback: (item: any) => any) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

/**
 * 위와 같은 함수를 테스트 하고 싶을 때, mock function을 쓸 수 있다.
 */
test("mock function test example", () => {
  const mockCallback = jest.fn((x) => x + 42);

  forEach([0, 1], mockCallback); // 이렇게 하는 것만으로, 테스트를 실행하는게 된다.

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call t the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the fucntion was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
