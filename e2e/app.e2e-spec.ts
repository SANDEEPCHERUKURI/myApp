import { MyNewsFeedPage } from './app.po';

describe('my-news-feed App', () => {
  let page: MyNewsFeedPage;

  beforeEach(() => {
    page = new MyNewsFeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
