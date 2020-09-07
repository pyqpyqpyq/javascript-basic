describe('for asynchronous', () => {
  it('should return immediately and later trigger the callback', (done) => {
    const logs = [];
    setTimeout(() => {
      logs.push('async callback triggered');

      // <--start
      // Please write down the correct value. You should write the final result directly.
      const expected = ['after calling setTimeout', 'async callback triggered'];
      // --end->

      expect(logs).toEqual(expected);
      done();
    }, 500);
    logs.push('after calling setTimeout');
  });
  // push() 方法可把它的参数顺序添加到 arrayObject 的尾部。
  // 它直接修改 arrayObject，而不是创建一个新的数组。push() 方法
  // 和 pop() 方法使用数组提供的先进后出栈的功能。该方法会改变数组的长度。
  it('should return immediately and later trigger the callback using promise', (done) => {
    function setTimeoutUsingPromise(ms) {
      return new Promise(resolve => setTimeout(() => resolve(), ms));
    }

    const logs = [];
    setTimeoutUsingPromise(500)
      .then(() => {
        logs.push('async callback triggered');

        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['after calling setTimeout', 'async callback triggered'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });

    logs.push('after calling setTimeout');
  });

  it('should trigger failure using reject', (done) => {
    function asyncOperationThatWillFail() {
      return new Promise((_, reject) => reject(new Error('>_<')));
    }

    const logs = [];
    asyncOperationThatWillFail()
      .then(() => logs.push('Success!'), error => logs.push(`Failed! ${error.message}`))
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['Failed! >_<'];
        // --end->
        expect(logs).toEqual(expected);
        done();
      });
  });

  it('should trigger failure using reject and handle using catch', (done) => {
    function asyncOperationThatWillFail() {
      return new Promise((_, reject) => reject(new Error('>_<')));
    }

    const logs = [];
    asyncOperationThatWillFail()
      .then(() => logs.push('Success!'))
      .catch(reason => logs.push(`Caught! ${reason.message}`))
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['Caught! >_<'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });
  });

  it('should propagate the error as the way of the sync code', (done) => {
    function asyncOperationThatWillFail() {
      return new Promise((_, reject) => reject(new Error('>_<')));
    }

    const logs = [];
    asyncOperationThatWillFail()
      .then(() => logs.push('Success!'))
      .catch(reason => logs.push(`Caught! ${reason.message}`))
      .then(() => logs.push('Continued'))
      .then(() => logs.push('Another continued'))
      .then(() => { throw new Error('Holy ~'); })
      .then(() => logs.push('After error happened'))
      .catch(reason => logs.push(`Error handled: ${reason.message}`))
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['Caught! >_<', 'Continued', 'Another continued', 'Error handled: Holy ~'];
        // --end->
        expect(logs).toEqual(expected);
        done();
      });
  });
});
