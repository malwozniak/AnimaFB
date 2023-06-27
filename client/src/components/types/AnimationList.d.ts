

type AnimationListProps = {
    indexBoard: number
    showCards: boolean
    showContainer: boolean
    user: IUser
    saveUser: (user: IUser) => void
    saveAnimation: (animationData: IAnimation) => void
    };
    
type AnimationListState = {
      AnimationData: IAnimation[]
      timeElapsed: number
      showLabel:  boolean
      showLabelEmpty: boolean
      isFirstRenderComplete: boolean
      showForm: boolean
      showChangeAcceptQuestion: boolean
      question: string
      loading: boolean
      cardNumber: number
      uniqueObject: JSX.Element
      position: number[]
      speed: number[]
      move: string
      distance: string
      setNum: number
      img: string
      nameObject: string
      created: boolean
      indexBoard: number
      imageNumber: number
    };
    