export const registerUser = async (form: { username: string, email: string, password: string }) => {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
    }

    return res;
};

export const updateImage = async (userId: string, images: string[], activeImage: number) => {
    const response = await fetch(`/api/user/update-image`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            image: images[activeImage],
        }),
    });

    if (response.ok) {
        console.log('Image de profil modifiée avec succès');
        window.location.reload();
    } else {
        console.error('Erreur lors de la modification de l\'image de profile');
    }
}
