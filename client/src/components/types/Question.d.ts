
type QuestionProps = {
    question: string
    showCard: boolean
    showContainer: boolean
    saveUser: (user: IUser) => void
    saveAnimation: (animationData: IAnimation) => void
    saveUpdate: (user: IUser, newNumberOfBalls: number[]) => void
    user: IUser
    indexBoard: number
    };
  interface QuestionListState {
    answer: number
    isSubmitted: boolean
    randomAnimation: number
    showCards: boolean
    min: number
    max: number
    clickCount: number
    showThankYouMessage: boolean
    showAnimationList: boolean
    selectedAns: string
    textArea: string
    chosenSection: string[]
    chosenSectionFirst: string[]
    indexBoard: number

    
  };