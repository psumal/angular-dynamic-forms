import { AngularFormUtilsPage } from './app.po';

describe('angular-form-utils App', () => {
  let page: AngularFormUtilsPage;

  beforeEach(() => {
    page = new AngularFormUtilsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
