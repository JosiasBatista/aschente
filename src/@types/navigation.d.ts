import { Challenge } from "../components/ChallengesList";
import { ChallengeEnrollment, EnrollmentActivities } from "../service/challenges";
import { UserDataProps } from "../service/user";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      onboarding: undefined,
      login: undefined,
      signup: undefined,
      home: undefined,
      showChallenge: { challenge: Challenge },
      challengeActivities: { challengeEnrollment: ChallengeEnrollment },
      userProfile: undefined,
      editProfile: undefined,
      createChallenge: undefined,
      challengeDifficultyAndTime: undefined,
      editChallenge: { challenge: Challenge }
    }
  }
}