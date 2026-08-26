import { Page, Locator } from "@playwright/test";

export class PaymentPage {
  transferReceiverField: Locator;
  bankAccountField: Locator;
  transferAmountField: Locator;
  transferTitleField: Locator;
  proceedTransferButton: Locator;
  transferMessage: Locator;

  constructor(private page: Page) {
    this.transferReceiverField = this.page.getByTestId("transfer_receiver");
    this.bankAccountField = this.page.getByTestId("form_account_to");
    this.transferAmountField = this.page.getByTestId("form_amount");
    this.transferTitleField = this.page.getByTestId("form_title");
    this.proceedTransferButton = this.page.getByRole("button", {
      name: "wykonaj przelew",
    });
    this.transferMessage = this.page.getByTestId("message-text");
  }
}
