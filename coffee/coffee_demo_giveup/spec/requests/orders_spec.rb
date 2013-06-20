require 'spec_helper'

describe "Orders" do
  it "validates card number", js: true do
    visit new_order_path
    fill_in "Credit Card Number", with: "1234"
    page.execute_script("$('#order_card_number').blur();")
    page.should have_content("Invalid card number")
    save_screenshot('./screenshot/validates_card_number.png', :full => true)
    system "open ./screenshot/validates_card_number.png"
  end

  it "fetches more orders when scrolling to bottom", js: true do
    11.times { |n| Order.create! number: n+1 }
    visit orders_path
    page.should have_content('Order #1')
    page.should_not have_content('Order #11')
    page.evaluate_script("window.scrollTo(0, 100000)")
    page.should have_content('Order #11')
    save_screenshot('./screenshot/fetches_more_orders.png', :full => true)
    system "open ./screenshot/fetches_more_orders.png"
  end
end
