class NetworkManager {
  fetchPrograms = async gender => {
    const res = await this.getResourse(
      '/api/programs/' +
        '?username=' +
        this.credentials.username +
        '&token=' +
        token +
        '&gender=' +
        gender,
    )
    return res
  }

  fetchProgram = async id => {
    const res = await this.getResourse(
      '/api/program/' +
        id +
        '?username=' +
        this.credentials.username +
        '&token=' +
        token,
    )
    return res
  }

  fetchWorkout = async id => {
    const res = await this.getResourse(
      '/api/ProgramWorkout/' +
        id +
        '?username=' +
        this.credentials.username +
        '&token=' +
        token,
    )
    return res
  }

  fetchWorkoutWithExercises = async id => {
    const res = await this.getResourse(
      '/api/ProgramList/' +
        id +
        '?username=' +
        this.credentials.username +
        '&token=' +
        token,
    )
    return res
  }

  workoutDone = async workoutId => {
    let params = {
      username: this.credentials.username,
      token: token,
      coach_id: workoutId,
    }

    const url = '/api/workoutdone'
    const res = await this.createResource(url, params)
    return await res
  }

  login = async () => {
    const url = '/api/login' + window.location.search

    const res = await this.getResourse(url)
    return await res
  }

  register = async () => {
    const url = '/api/register/'

    const res = await this.getResourse(url)
    return await res
  }

  registerWithPromise = () => {
    return new Promise((resolve, reject) => {
      const url = '/api/register/'
      this.getResourse(url)
        .then(body => {
          if (body.result === 'success') {
            resolve({
              username: body.username,
              token: body.token,
            })
          } else {
            reject(body)
          }
        })
        .catch(error => reject(error))
    })
  }

  getResourse = async url => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`${res.status}`)
    }
    return await res.json()
  }

  createResource = async (url, params) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`)
    }
    return await res.json()
  }
}

export default NetworkManager
