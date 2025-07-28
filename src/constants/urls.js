export const URL_HOME = "/home";
export const URL_ABOUT = "/about";
export const URL_TOPIC = "/topics";
export const URL_TRAINING = "/trainings?%(params)s";
export const URL_DETAIL_TRAINING = "/training/module/materials?%(params)s";
export const URL_SIGN_IN = "/auth/login";
export const URL_SIGN_ADMIN = "/internal/auth/login";
export const URL_CATEGORY_NAVBAR = "/topics/trainings";
export const URL_SEARCH_TRAINING = "/trainings?%(params)s";

//admin
export const URL_INTERNAL_TRAINEE = "/internal/trainees?%(params)s";
export const URL_INTERNAL_TRAINER = "/internal/trainers?%(params)s";
export const URL_INTERNAL_ADMIN = "/internal/admins?%(params)s";
export const URL_INTERNAL_MATERIAL = "/internal/trainings?%(params)s";
export const URL_INTERNAL_CERTIFICATE =
  "/internal/certificates/trainee?%(params)s";
export const URL_INTERNAL_TRAINEE_LIST =
  "/internal/trainees/list?is_active=true";
export const URL_INTERNAL_TRAINING = "/internal/trainings";
export const URL_INTERNAL_TRAINING_LIST =
  "/internal/trainings/list?page=1&limit=999";

export const URL_BADGE_TRAINING_LIST = "/internal/badges?page=1&limit=999";
export const URL_TOPIC_TRAINING_LIST = "/internal/topics?page=1&limit=999";
export const URL_TRAINER_TRAINING_LIST =
  "/internal/trainers/list?page=1&limit=999";

export const URL_INTERNAL_PROFILE = "/internal/auth/current";
//trainee
export const URL_TRAINEE_CERTIFICATE = "/trainee/certificates?%(params)s";
export const URL_TRAINEE_PROFILE = "/auth/current";
export const URL_TRAINEE_TRAINING = "/trainings/current?%(params)s";
export const URL_TRAINEE_TRAINING_DETAIL = "/trainee/trainings?%(params)s";
export const URL_TRAINEE_NOTIFICATION =
  "/trainee/notifications?page=1&limit=10";

export const URL_TRAINEE_UPDATE_PROGRESS = "/trainee/trainings/isdone";
