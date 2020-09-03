//1.we're taking the 'apple' splitting it into an array (split every character)
  //2.mapping it into a new array.
  //- That is going to return the _ character or the actual letter
  //3.cheking inside this.state.guessed new Set(). 
  //- Which at the beggining is an empty set. But eventually might contain some
  // other letters . So if the user guessed the letter we're going to put the letter in
  // otherwise we place a "_"