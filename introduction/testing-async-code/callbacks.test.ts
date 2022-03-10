/**
 * Test code가 맨끝까지 가버리면 그냥 테스트가 끝난다.
 * 즉, 비동기를 기다려주지 않는다.
 * 그러니, 이래처럼 해서는 즈얼~대 안된다.
 */
// function fetchData(callback: any) {
//   setTimeout(() => callback("peanut butter"), 1000);
// }

// test("the data is peanut butter", () => {
//   function callback(data: string) {
//     expect(data).toBe("peanut butter");
//   }

//   fetchData(callback);
// });

/**
 * 대신, done이라는 파라미터를 test의 두 번째 인자에 전달하라.
 * Jest가 이 done이 실행될 때 까지 기다릴 것이다.
 * 만약 done이 실행되지 않으면, 시간 초과로 테스트가 실패할 것이다.
 * done이 Promises와 섞이면 memory leak으로 사고가 날 수 있다. 주의.
 */
function fetchData(cb: (data: string) => void) {
  setTimeout(() => cb("peanut butter"), 100);
}

test("the data is peanut butter", (done) => {
  // done을 전달한다!!
  function callback(data: string) {
    try {
      expect(data).toBe("peanut butter");
      done(); // 그리고 done을 실행해서 작업이 마쳤음을 알린다.
    } catch (error) {
      done(error); // 에러가 발생하면 에러를 담아서 done을 실행한다.
    }
  }

  fetchData(callback);
});
