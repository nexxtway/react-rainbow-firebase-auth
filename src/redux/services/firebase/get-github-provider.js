import * as firebase from 'firebase';

export default function getGitHubProvider() {
    const provider = new firebase.auth.GithubAuthProvider();
    return provider;
}
