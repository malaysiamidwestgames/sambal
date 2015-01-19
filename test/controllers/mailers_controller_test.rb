require 'test_helper'

class MailersControllerTest < ActionController::TestCase
  setup do
    @mailer = mailers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mailers)
  end

  test "should create mailer" do
    assert_difference('Mailer.count') do
      post :create, mailer: {  }
    end

    assert_response 201
  end

  test "should show mailer" do
    get :show, id: @mailer
    assert_response :success
  end

  test "should update mailer" do
    put :update, id: @mailer, mailer: {  }
    assert_response 204
  end

  test "should destroy mailer" do
    assert_difference('Mailer.count', -1) do
      delete :destroy, id: @mailer
    end

    assert_response 204
  end
end
