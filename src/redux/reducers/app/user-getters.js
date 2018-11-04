
export function isFacebookUser() {
    return Array.isArray(this.providerData)
        && this.providerData[0]
        && this.providerData[0].providerId === 'facebook.com';
}


export function getEmail() {
    if (this.email) {
        return this.email;
    }
    if (this.isFacebookUser()) {
        return this.providerData[0].email;
    }
    return undefined;
}