Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    resources :areas, only: [:show] do
      resources :procesos, only: [:index, :create]
      resources :auditorias, only: [:index, :create]
    end
    resources :procesos, only: [] do
      resources :evidences, only: [:index, :create]
    end
    resources :auditorias, only: [:show] do
      resources :evaluaciones, only:[:update]
      match '/empezar_auditoria', to: 'auditorias#empezar_auditoria', via: 'post'
      match '/evaluar_cumplimiento', to: 'auditorias#evaluar_cumplimiento', via: 'post'
      match '/finalizar_auditoria', to: 'auditorias#finalizar_auditoria', via: 'post'
      match '/evaluaciones_iniciales', to: 'auditorias#evaluaciones_iniciales', via: 'get'
      match '/evaluaciones_de_cumplimiento', to: 'auditorias#evaluaciones_de_cumplimiento', via: 'get'
    
    end

    scope '/search' do
      match '/areas',to: 'areas#search_areas', as:'search_areas', via: 'get'
    end
  end

  match '*path', to: 'home#index', via: :get
  root 'home#index'
end
