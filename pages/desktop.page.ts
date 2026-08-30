import { Page, Locator } from "playwright";

export class DesktopPage {
  receiverField: Locator;
  transferField: Locator;
  transferTitleField: Locator;
  buttonProceed: Locator;
  closeButton: Locator;
  messageField: Locator;
  phoneNumberField: Locator;
  topUpAmountField: Locator;
  agreementCheck: Locator;
  executeButton: Locator;
  confirmationMessageField: Locator;
  totalMoneyValue: Locator;
  userNameLocator: Locator;

  constructor(private page: Page) {
    this.receiverField = this.page.locator("#widget_1_transfer_receiver");
    this.transferField = this.page.locator("#widget_1_transfer_amount");
    this.transferTitleField = this.page.locator("#widget_1_transfer_title");
    this.buttonProceed = this.page.getByRole("button", { name: "wykonaj" });
    this.closeButton = this.page.getByTestId("close-button");
    this.messageField = this.page.getByTestId("message-text");

    this.phoneNumberField = this.page.locator("#widget_1_topup_receiver");
    this.topUpAmountField = this.page.locator("#widget_1_topup_amount");
    this.agreementCheck = this.page.locator("#widget_1_topup_agreement");
    this.executeButton = this.page.locator("#execute_phone_btn");
    this.confirmationMessageField = this.page.getByRole("link", {
      name: "Doładowanie wykonane! 20,",
    });
    this.totalMoneyValue = this.page.locator("#money_value");
    this.userNameLocator = this.page.getByTestId("user-name");
  }

  async successTopUp(
    topUpPhoneNumber: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.phoneNumberField.selectOption(topUpPhoneNumber);
    await this.topUpAmountField.fill(topUpAmount);
    await this.agreementCheck.check();
    await this.buttonProceed.click();
    await this.executeButton.click();
  }

  async successTransaction(
    receiverID: string,
    transferAmount: string,
    tranferTitle: string,
  ): Promise<void> {
    await this.receiverField.selectOption(receiverID);
    await this.transferField.fill(transferAmount);
    await this.transferTitleField.fill(tranferTitle);
    await this.buttonProceed.click();
    await this.closeButton.click();
  }
}
