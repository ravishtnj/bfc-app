import { BfcAppPage } from './app.po';

describe('bfc-app App', () => {
  let page: BfcAppPage;

  beforeEach(() => {
    page = new BfcAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
