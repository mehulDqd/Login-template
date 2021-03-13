import { User } from './types';

export const mapUser = ({
  first_name: firstName = '',
  last_name: lastName = '',
  email = '',
  birth = '',
  phone_number: phoneNumber = '',
  address = '',
  image = '',
  id,
  is_admin: isAdmin,
}: User) => ({
  firstName,
  lastName,
  email,
  birth,
  phoneNumber,
  address,
  image,
  id,
  isAdmin,
});

