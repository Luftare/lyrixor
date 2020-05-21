import { FunctionComponent } from 'react';
import { useStore } from 'react-hookstore';
import { useHistory } from 'react-router';
import { Stores } from '../store';

interface AuthorRequiredProps {
  redirect: string;
}

const AuthorRequired: FunctionComponent<AuthorRequiredProps> = ({
  children,
  redirect,
}) => {
  const [authorName] = useStore(Stores.AuthorName);
  const history = useHistory();

  if (authorName) {
    return children;
  } else {
    history.push(redirect);
    return null;
  }
};

export default AuthorRequired;
