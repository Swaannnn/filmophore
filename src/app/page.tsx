import {ReactElement} from "react"
import PrimaryButton from "@/components/PrimaryButton"
import SecondaryButton from "@/components/SecondaryButton"

export default function Home(): ReactElement {
  return (
      <div className="pt-24 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-8">
              <p className="font-light text-8xl text-center w-[700px]">
                  Retrouve de nombreux films sur FilmoPhore
              </p>
              <p className="text-2xl text-white-secondary text-center">
                  inscrit toi pour ajouter des favoris ou noter des films
              </p>
              <div className="flex gap-4 items-center">
                  <PrimaryButton url="/login">Se connecter &#8594;</PrimaryButton>
                  <p>ou</p>
                  <SecondaryButton url="/register">S&apos;inscrire &#8594;</SecondaryButton>
              </div>
          </div>
      </div>
  )
}
