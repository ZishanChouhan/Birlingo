//***** Validation rules for input fields */ 
const validation = {

  email: {
    presence: {
      message: "msg_enter_email"
    },
    format: {
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      message: "err_valid_email"
    }
  },

  rating: {
    presence: {
      message: "err_please_rate"
    },
  },

  feedback: {
    presence: {
      message: "msg_enter_feedback"
    },
    length: {
      maximum: 500,
      message:
        "err_feedback_100_char" //chec
    }
  },

  feedback2: {
    presence: {
      message: "msg_enter_feedback"
    },
    length: {
      maximum: 500,
      message:
        "err_feedback_100_char" //chec
    }
  },

  surname: {
    presence: {
      message: "err_select_surname"
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,29}$/,
      message:
        "err_surname_20_char" //chec
    }
  },

  name: {
    presence: {
      message: "err_enter_name"
    },
    length: {

      maximum: 20,
      message:
        "err_name_20_char"
    }
  },
  promoCode: {
    presence: {
      message: "err_enter_promo_code"
    },
    length: {

      maximum: 20,
      message:
        "err_promo_code_20_char"
    }
  },
  term: {
    presence: {
      message: "Please accept terms and conditions"
    }
  },
  language: {
    presence: {
      message: "err_select_language"
    }
  },
  nativeLanguage: {
    presence: {
      message: "err_select_native_language"
    }
  },
  check1: {
    presence: {
      message: "err_terms_condition"
    }
  },
  check2: {
    presence: {
      message: "err_terms_condition"
    }
  },
  check_term_condition: {
    presence: {
      message: "msg_term_condition"
    }
  },


  confirm_password: {
    presence: {
      message: "err_enter_confirmPassword"
    },
    length: {
      minimum: 1,
      message: ""
    },
    match: {
      message: "err_password_not_match"
    }
  },
  old_password: {
    presence: {
      message: "err_enter_old_pass"
    },
    format: {
      pattern: /^\S*$/,
      message: "Spaces are not allowed"
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: "err_pass_length"
    }
  },
  password: {
    presence: {
      message: "err_enter_pass"
    },
    format: {
      pattern: /^\S*$/,
      message: "Spaces are not allowed"
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: "err_pass_length"
    }
  },


  new_password: {
    presence: {
      message: "Please enter new password"
    },
    format: {
      pattern: /^\S*$/,
      message: "Spaces are not allowed"
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: "err_pass_length"
    }
  },

  login_password: {
    presence: {
      message: "err_enter_password"
    }
  },


  otp: {
    presence: {
      message: "err_enter_otp"
    },
    format: {
      pattern: /^[0-9]{4,4}$/,
      message: "err_valid_otp"
    },
    length: {
      minimum: 4,
      message: "err_valid_otp"
    }
  },


};

export default validation;
