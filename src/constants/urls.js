export const URL_HOME = "/home";
export const URL_SIGN_IN = "/auth/login";
export const URL_SIGN_ADMIN = "/internal/auth/login";

//admin
export const URL_INTERNAL_TRAINEE = "/internal/trainees?%(params)s";
export const URL_INTERNAL_TRAINER = "/internal/trainers?%(params)s";
export const URL_INTERNAL_ADMIN = "/internal/admins?%(params)s";
export const URL_INTERNAL_MATERIAL = "/internal/training/materials?%(params)s";
export const URL_INTERNAL_CERTIFICATE =
  "/internal/certificates/trainee?%(params)s";
export const URL_INTERNAL_TRAINEE_LIST =
  "/internal/trainees/list?is_active=true";
export const URL_INTERNAL_TRAINING_LIST = "/internal/trainings/list";

export const URL_INTERNAL_PROFILE = "/internal/auth/current";
//trainee
export const URL_TRAINEE_CERTIFICATE = "/trainee/certificates?%(params)s";
export const URL_TRAINEE_PROFILE = "/auth/current";
export const URL_TRAINEE_NOTIFICATION =
  "/trainee/notifications?page=1&limit=10";
