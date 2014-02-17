class ChatController < WebsocketRails::BaseController
  # before_filter :ensure_logged_in!
  # after_filter do
  #   puts "perform post-action work"
  # end
  # around_filter :time_request

  # before_filter :only => :new_event do
  #   puts "new_event was called"
  # end

  # def ensure_logged_in!
  #   if current_user.nil?
  #     current_user = User.new
  #   end
  # end

  # def time_request
  #   start = Time.now
  #   yield
  #   delta = Time.now - start
  #   puts "Action took #{delta.to_f} seconds"
  # end

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def connect
    puts "#{data}"
  	new_message = {:message => data[:message]}
    broadcast_message :message, new_message
  	# send_message :message, new_message
  end

  # trigger events on client 
  # new_message = {:message => 'this is a message'}
  # send_message :event_name, new_message

  # to trigger success and failure callbacks on client, if registered for request
  # def awesomeness_approval
  #   if message[:awesomeness] > 5
  #     trigger_success {'awesome level is sufficient'}
  #   else
  #     trigger_failure {'awesome level is insufficient'}
  #   end
  # end

  # Broadcast to all connected clients.
  # new_comment = Comment.latest
  # broadcast_message :new_comment, new_comment
end

