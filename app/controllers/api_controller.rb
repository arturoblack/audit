class ApiController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  #before_action :authenticate_user!, :check_authorization
  #rescue_from Exceptions::ParamsError, :with => :error_handling
  #rescue_from ArgumentError, :with => :error_handling
  rescue_from ActiveRecord::RecordNotFound do |exception|
    error_handling(exception, 'Record not found', :not_found)
  end
  rescue_from AASM::InvalidTransition do |exception|
    error_handling(exception, 'Invalid transition')
  end
  #rescue_from CanCan::AccessDenied do |exception|
  #  error_handling(exception, 401)
  #end
  private
  def error_handling(e, type, code = nil)
    render json: {error: type,
                  description: e.message}, status: code || 400
  end
  def current_ability
    @current_ability ||= ApiAbility.new(current_user)
  end
  def check_authorization
    subject = params[:controller].split('/').pop.to_sym
    action = params[:action].to_sym
    authorize! action, subject
  end
end
