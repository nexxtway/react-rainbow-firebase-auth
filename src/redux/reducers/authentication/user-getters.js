
export function isFacebookUser() {
    return Array.isArray(this.providerData)
        && this.providerData[0]
        && this.providerData[0].providerId === 'facebook.com';
}

export function isGoogleUser() {
    return Array.isArray(this.providerData)
        && this.providerData[0]
        && this.providerData[0].providerId === 'google.com';
}

export function isGitHubUser() {
    return Array.isArray(this.providerData)
        && this.providerData[0]
        && this.providerData[0].providerId === 'github.com';
}

export function getEmail() {
    if (this.email) {
        return this.email;
    }
    if (this.isFacebookUser() || this.isGoogleUser() || this.isGitHubUser()) {
        return this.providerData[0].email;
    }
    return undefined;
}
