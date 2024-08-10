import {ReactElement} from "react"
import {Button} from "@/components/Button";

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
                  <Button url="/login" variant="primary">Se connecter &#8594;</Button>
                  <p>ou</p>
                  <Button url="/register" variant="secondary">S&apos;inscrire &#8594;</Button>
              </div>
          </div>
      </div>
  )
}
