class Game < ActiveRecord::Base
    belongs_to :sports
    has_many :teams

    def sports_registration_status
        idx = self.teams.index do |team|
            team.team_captain == current_user.id
        end
        return idx != nil
    end
end
