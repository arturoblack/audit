class BasePdf < Prawn::Document
  LOGO_PATH = "#{Rails.root}/app/assets/images/logo_ucci.jpg"
  
  def initialize(options={})
    super(options)
    @address_x = 35
    @lineheight_y = 12
    @font_size = 9
    @report_header_x = 325
  end
  
  private
  
  def header
    initial_y = cursor
    initialmove_y = 5
    move_down initialmove_y
    change_font(type: 'Helvetica', size: @font_size)
    render_header_text
    render_header_logo
  end


  def change_font(**options)
    font(options[:type] || 'Helvetica')
    font_size(options[:size] || 10)
  end
  
  def render_header_text
    text_box "UNIVERSIDAD CONTINENTAL", at: [@address_x, cursor], style: :bold
    move_down @lineheight_y
    text_box "Programa Audit-UC", :at => [@address_x, cursor]
    move_down @lineheight_y
  end
  
  def render_header_logo
    @last_measured_y = cursor
    move_cursor_to bounds.height
    image LOGO_PATH, :width => 200, :position => :right
    move_cursor_to @last_measured_y
  end
  
  def current_datetime
    Time.now.strftime("%d/%m/%Y a las %I:%M%p")
  end

  def sub_header_left(report_name)
    move_down 65
    @last_measured_y = cursor
    text_box "REPORTE : #{report_name}", :at => [@address_x, cursor]
    move_down @lineheight_y
    text_box "GENERADO : #{current_datetime}", :at => [@address_x, cursor]
    move_down @lineheight_y
  end

  def sub_header_right(table_data)
    move_cursor_to @last_measured_y  
    table(table_data, :position => @report_header_x, :width => 215) do
      style(row(0..1).columns(0..1), :padding => [1, 5, 1, 5], :borders => [])
      style(row(2), :background_color => 'e9e9e9', :border_color => 'dddddd', :font_style => :bold)
      style(column(1), :align => :right)
      style(row(2).columns(0), :borders => [:top, :left, :bottom])
      style(row(2).columns(1), :borders => [:top, :right, :bottom])
    end
  end
end
