class BasePdf < Prawn::Document
  LOGO_PATH = "#{Rails.root}/app/assets/images/logo_ucci.jpg"
  
  def initialize(options={})
    super(options)
    @lineheight_y = 12
    font_size 10
    font 'Helvetica'
  end
  
  def header(title=nil)
    image LOGO_PATH, position: :left, height: 30
    move_down @lineheight_y
    text "Universidad Continental", size: 14, style: :bold, align: :center
    if title
      text title, size: 10, style: :bold_italic, align: :center
    end
  end
end
