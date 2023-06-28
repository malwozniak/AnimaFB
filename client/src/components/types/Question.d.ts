
type QuestionProps = {
    question: string
    showCard: boolean
    showContainer: boolean
    saveUser: (user: IUser) => void 
    saveUpdate: (user: IUser,  newNumberOfBalls: number,newMovement: string[], newSection: string[], newOpinion: string, badOpinon: string, object: string[]) => void
    saveUpdateAnimation: (animationData: IAnimation[]) => void
    user: IUser
    indexBoard: number
    numberOBalls: number[]
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
    previousStates: array
    textArea: string
    textAreaNegative: string
    chosenSection: string[]
    chosenSectionFirst: string[]
    choiceHandlerSection: string[]
    chooseBall: any
    indexBoard: number
    arrayNumbers: array
    
  };