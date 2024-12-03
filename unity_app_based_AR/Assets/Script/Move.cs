using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move : MonoBehaviour
{
    public float moveAmount = 0.1f;

    public void MoveUp()
    {
        transform.position += new Vector3(0, moveAmount, 0);
    }

    public void MoveDown()
    {
        transform.position += new Vector3(0, -moveAmount, 0);
    }

    public void MoveLeft()
    {
        transform.position += new Vector3(-moveAmount, 0, 0);
    }

    public void MoveRight()
    {
        transform.position += new Vector3(moveAmount, 0, 0);
    }
}
