
type Props = {
    saveUser: (formData: IUser) => void
    saveAnimation: (animationData: IAnimation[]) => void
    saveUpdateAnimation: (animationData: IAnimation[]) => void
    
  };
  
  type State = {
    formData: IUser
    isSubmitted: boolean
    showCards: boolean
    chosenNumber: number
    selectedGender: string
    selectedAns: string
    randomAnimation: number
    selectedFewAns: {
      id: string
    }
    validationErrors: {
      age?: string
      gender?: string
      sayYesNo?: string
      animationType?: string
    },
  };
  