import { fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "./Counter";
import user from "@testing-library/user-event";

describe("Counter", () => {
  describe(`initialized with defaultCount=10 and description="www"`, () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="www" />);
    });
    test(`renders "Current Counter: 10"`, () => {
      // render(<Counter defaultCount={0} description="My Counter" />);
      // screen.getByText("Current Count:0")  //单独的这句如果找不到 也会导致抛出错误让测试不通过
      //if you want to receive null instead of an exception using: screen.queryByText(/My Counter/)
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });
    test(`renders title as "My Counter"`, () => {
      expect(screen.getByText(/www/)).toBeInTheDocument();
    });
  });
  describe(`initialized with defaultCount=0 and description="My Counter"`, () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });
    test(`renders "Current Counter: 0"`, () => {
      // render(<Counter defaultCount={0} description="My Counter" />);
      // screen.getByText("Current Count:0")  //单独的这句如果找不到 也会导致抛出错误让测试不通过
      //if you want to receive null instead of an exception using: screen.queryByText(/My Counter/)
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });
    test(`renders title as "My Counter"`, () => {
      expect(screen.getByText(/My Counter/)).toBeInTheDocument();
    });
    describe("when + is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "+" }));
      });
      test(`renders "Current Count: 1"`, () => {
        // render(<Counter defaultCount={0} description="My Counter" />);
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });
    describe("when - is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "-" }));
      });
      test(`renders "Current Count: -1"`, () => {
        // render(<Counter defaultCount={0} description="My Counter" />);
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });
  });
});

describe("Counter 2", () => {
  describe(`initialized with defaultCount=10 and description="www"`, () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="www" />);
    });
    test(`renders "Current Counter: 10"`, () => {
      // render(<Counter defaultCount={0} description="My Counter" />);
      // screen.getByText("Current Count:0")  //单独的这句如果找不到 也会导致抛出错误让测试不通过
      //if you want to receive null instead of an exception using: screen.queryByText(/My Counter/)
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });
    test(`renders title as "My Counter"`, () => {
      expect(screen.getByText(/www/)).toBeInTheDocument();
    });

    describe(
      "when the incrementor changes to 5 and " + " button is clicked",
      () => {
        it(`renders "Current Count: 15"`, async () => {
          await user.clear(screen.getByLabelText("Incrementor"));
          // 这里有个陷阱， 因为我们的input value事先设置为1； 用户输入时应该先选中或者取消这个1
          // 然后进行需要的数值输入，否则不清除的话直接输入5，则此时incrementor为15
          await user.type(screen.getByLabelText("Incrementor"), "5");
          await user.click(screen.getByRole("button", { name: "+" }));
          expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
        });
      }
    );
    describe(`when the incrementor changes to 5 and " - " button is clicked`, () => {
      it(`renders "Current Count: 15"`, async () => {
        await user.clear(screen.getByLabelText("Incrementor"));
        await user.type(screen.getByLabelText("Incrementor"), "5");
        await user.click(screen.getByRole("button", { name: "-" }));
        expect(screen.getByText("Current Count: 5")).toBeInTheDocument();
      });
    });
  });
});

// 思路总结：
/**
 * 1. 应该对test用例进行describe分组； 并且实施完之后可以通顺读下来整个过程；
 * 2. react testing library 不建议把组件render渲染放在before 和 after hook 中；
 * 3.We recommend invoking userEvent.setup() before the component is rendered.
 *   This can be done in the test itself, or by using a setup function.
 *   We discourage rendering or using any userEvent functions outside of the test itself
 *   - e.g. in a before/after hook - for reasons described in "Avoid Nesting When You're Testing".
 * 4.  #0. user.setup() (不是必须选项，暂时不清楚具体是什么)
 *     #1. 首先渲染组件 （可以随意设置想测试的初始props值）
 *     #2. 用户操作 user （userEvent）
 *     #3. 断言
 *
 * 5. 关键API
 *    getByRole("button",{name:"+"})
 *    getByLabelText("Incrementor")  选中的是label对应的form control
 *
 */
